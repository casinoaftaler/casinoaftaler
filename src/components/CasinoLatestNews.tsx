import { Link } from "react-router-dom";
import { ArrowRight, Link } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCasinoNewsByName } from "@/hooks/useCasinoNewsByName";

interface CasinoLatestNewsProps {
  casinoName: string;
}

export function CasinoLatestNews({ casinoName }: CasinoLatestNewsProps) {
  const { data: articles } = useCasinoNewsByName(casinoName, 3);

  if (!articles || articles.length === 0) return null;

  return (
    <section className="my-8">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MenuIcon iconName="newspaper" className="h-5 w-5 text-primary" />
            Seneste nyheder om {casinoName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {articles.map((article) => (
              <li key={article.id}>
                <Link
                  to={`/casino-nyheder/${article.slug}`}
                  className="group flex items-start gap-3 rounded-lg p-2 -mx-2 transition-colors hover:bg-accent"
                >
                  <ArrowRight className="h-4 w-4 mt-0.5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">
                      {article.title}
                    </span>
                    {article.published_at && (
                      <span className="block text-xs text-muted-foreground mt-0.5">
                        {new Date(article.published_at).toLocaleDateString("da-DK", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/casino-nyheder"
            className="mt-3 inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
          >
            Se alle nyheder <ArrowRight className="h-3 w-3" />
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}
