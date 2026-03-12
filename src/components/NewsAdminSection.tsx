import { useState } from "react";
import { getCategoryLabel } from "@/lib/newsCategoryLabels";
import { useAllNews, useCreateNews, useUpdateNews, useDeleteNews, type CasinoNewsArticle } from "@/hooks/useCasinoNews";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Pencil, Loader2, Eye, Send } from "lucide-react";
import { toast } from "sonner";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/æ/g, "ae").replace(/ø/g, "oe").replace(/å/g, "aa")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function NewsForm({ article, onClose }: { article?: CasinoNewsArticle; onClose: () => void }) {
  const createNews = useCreateNews();
  const updateNews = useUpdateNews();
  const isEdit = !!article;

  const [form, setForm] = useState({
    title: article?.title || "",
    slug: article?.slug || "",
    excerpt: article?.excerpt || "",
    content: article?.content || "",
    category: article?.category || "generelt",
    tags: article?.tags?.join(", ") || "",
    featured_image: article?.featured_image || "",
    meta_title: article?.meta_title || "",
    meta_description: article?.meta_description || "",
    status: article?.status || "draft" as "draft" | "published",
  });

  const handleTitleChange = (title: string) => {
    setForm((f) => ({
      ...f,
      title,
      slug: isEdit ? f.slug : slugify(title),
      meta_title: f.meta_title || title,
    }));
  };

  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

  const inferCategory = (title: string, content: string): string => {
    const text = (title + " " + stripHtml(content)).toLowerCase();
    const titleLower = title.toLowerCase();
    
    // Score-based: title matches count 3x, content matches count 1x
    const categories: { key: string; titlePattern: RegExp; contentPattern: RegExp }[] = [
      { key: "betalingsmetoder", titlePattern: /betalingsmetod|mobilepay|trustly|indbetaling|udbetaling/, contentPattern: /betalingsmetod|mobilepay|trustly|visa|mastercard|bankoverf|mitid|indbetaling|udbetaling/ },
      { key: "licenser", titlePattern: /licens|spillemyndighed/, contentPattern: /licens|spillemyndighed|tilladelse|regulering/ },
      { key: "bonusser", titlePattern: /bonus|freespin|free spin/, contentPattern: /bonus|velkomst|freespin|free spin|indbetalingsbonus|omsætningskrav/ },
      { key: "lovgivning", titlePattern: /lovgivning|regulering|bekendtgørelse/, contentPattern: /lovgivning|regulering|lov |forslag|bekendtgørelse/ },
      { key: "teknologi", titlePattern: /teknologi|ai |blockchain/, contentPattern: /teknologi|ai |kunstig intelligens|blockchain|software/ },
      { key: "nye-casinoer", titlePattern: /nye casino|nyt casino|lancere/, contentPattern: /nye casino|nyt casino|lancere|åbner|ny platform/ },
    ];

    let bestCategory = "generelt";
    let bestScore = 0;

    for (const cat of categories) {
      let score = 0;
      const titleMatches = titleLower.match(cat.titlePattern);
      const contentMatches = text.match(cat.contentPattern);
      if (titleMatches) score += 3;
      if (contentMatches) score += 1;
      if (score > bestScore) {
        bestScore = score;
        bestCategory = cat.key;
      }
    }
    return bestCategory;
  };

  const inferTags = (title: string, content: string): string[] => {
    const text = (title + " " + stripHtml(content)).toLowerCase();
    const tagMap: Record<string, string> = {
      "mitid": "MitID", "mobilepay": "MobilePay", "trustly": "Trustly",
      "nemid": "NemID", "rofus": "ROFUS", "spillemyndighed": "Spillemyndigheden",
      "freespin": "Free Spins", "free spin": "Free Spins",
      "velkomstbonus": "Velkomstbonus", "indbetalingsbonus": "Indbetalingsbonus",
      "live casino": "Live Casino", "dansk licens": "Dansk Licens",
      "visa": "Visa", "mastercard": "Mastercard",
    };
    const found = new Set<string>();
    for (const [keyword, tag] of Object.entries(tagMap)) {
      if (text.includes(keyword)) found.add(tag);
    }
    return Array.from(found).slice(0, 6);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.content.length < 800) {
      toast.error("Artiklen skal være minimum 800 tegn.");
      return;
    }

    // Auto-generate missing fields
    const autoMetaTitle = form.meta_title || form.title.slice(0, 60);
    const autoMetaDesc = form.meta_description || 
      (form.excerpt ? form.excerpt.slice(0, 160) : stripHtml(form.content).slice(0, 160));
    const manualTags = form.tags.split(",").map((t) => t.trim()).filter(Boolean);
    const autoTags = manualTags.length > 0 ? manualTags : inferTags(form.title, form.content);
    const autoCategory = form.category !== "generelt" ? form.category : inferCategory(form.title, form.content);

    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt || null,
      content: form.content,
      category: autoCategory,
      tags: autoTags,
      featured_image: form.featured_image || null,
      meta_title: autoMetaTitle,
      meta_description: autoMetaDesc,
      status: form.status,
      published_at: form.status === "published" ? (article?.published_at || new Date().toISOString()) : null,
    };

    try {
      if (isEdit) {
        await updateNews.mutateAsync({ id: article.id, ...payload });
        toast.success("Artikel opdateret");
      } else {
        await createNews.mutateAsync(payload);
        toast.success("Artikel oprettet");
      }
      onClose();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Titel</Label>
          <Input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label>Slug</Label>
          <Input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Excerpt</Label>
        <Textarea value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} rows={2} />
      </div>

      <div className="space-y-2">
        <Label>Indhold (HTML)</Label>
        <Textarea value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} rows={12} required />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Kategori</Label>
          <Select value={form.category} onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="generelt">Generelt</SelectItem>
              <SelectItem value="licenser">Licenser</SelectItem>
              <SelectItem value="bonusser">Bonusser</SelectItem>
              <SelectItem value="betalingsmetoder">Betalingsmetoder</SelectItem>
              <SelectItem value="lovgivning">Lovgivning</SelectItem>
              <SelectItem value="teknologi">Teknologi</SelectItem>
              <SelectItem value="nye-casinoer">Nye Casinoer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Tags (komma-separeret)</Label>
          <Input value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))} placeholder="MitID, Trustly" />
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={form.status} onValueChange={(v: "draft" | "published") => setForm((f) => ({ ...f, status: v }))}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Kladde</SelectItem>
              <SelectItem value="published">Publiceret</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Meta Title</Label>
          <Input value={form.meta_title} onChange={(e) => setForm((f) => ({ ...f, meta_title: e.target.value }))} maxLength={60} />
        </div>
        <div className="space-y-2">
          <Label>Meta Description</Label>
          <Input value={form.meta_description} onChange={(e) => setForm((f) => ({ ...f, meta_description: e.target.value }))} maxLength={160} />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Featured Image URL</Label>
        <Input value={form.featured_image} onChange={(e) => setForm((f) => ({ ...f, featured_image: e.target.value }))} />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>Annuller</Button>
        <Button type="submit" disabled={createNews.isPending || updateNews.isPending}>
          {(createNews.isPending || updateNews.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEdit ? "Opdater" : "Opret"}
        </Button>
      </div>
    </form>
  );
}

export function NewsAdminSection() {
  const { data: articles, isLoading } = useAllNews();
  const deleteNews = useDeleteNews();
  const updateNews = useUpdateNews();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editArticle, setEditArticle] = useState<CasinoNewsArticle | undefined>();

  const handlePublish = async (article: CasinoNewsArticle) => {
    try {
      await updateNews.mutateAsync({
        id: article.id,
        status: "published",
        published_at: new Date().toISOString(),
      });
      toast.success("Artikel publiceret!");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Casino Nyheder</h2>
          <p className="text-muted-foreground">Administrer nyhedsartikler. Max 4 pr. uge.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) setEditArticle(undefined); }}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Ny Artikel</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{editArticle ? "Rediger Artikel" : "Ny Artikel"}</DialogTitle>
            </DialogHeader>
            <NewsForm article={editArticle} onClose={() => { setDialogOpen(false); setEditArticle(undefined); }} />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="space-y-3">
          {articles?.map((article) => (
            <Card key={article.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={article.status === "published" ? "default" : "secondary"}>
                      {article.status === "published" ? "Publiceret" : "Kladde"}
                    </Badge>
                    <Badge variant="outline">{getCategoryLabel(article.category)}</Badge>
                  </div>
                  <h3 className="font-semibold truncate">{article.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    /{article.slug} • {new Date(article.created_at).toLocaleDateString("da-DK")}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {article.status === "draft" && (
                    <Button size="sm" variant="outline" onClick={() => handlePublish(article)}>
                      <Send className="h-4 w-4 mr-1" /> Publicer
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={() => { setEditArticle(article); setDialogOpen(true); }}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive"><Trash2 className="h-4 w-4" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Slet artikel?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Artiklen "{article.title}" slettes permanent.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuller</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteNews.mutate(article.id)}>Slet</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
          {articles?.length === 0 && (
            <p className="text-center py-12 text-muted-foreground">Ingen artikler endnu.</p>
          )}
        </div>
      )}
    </div>
  );
}
