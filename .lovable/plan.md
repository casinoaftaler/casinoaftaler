

## Problem

When logged in with Twitch using a non-admin email, users cannot access the admin panel. The "Adgang Nægtet" (Access Denied) screen appears but provides no way to sign out and log in with admin credentials instead.

## Solution

Add a "Log ud og log ind som admin" (Sign out and log in as admin) button to the Access Denied screen that:
1. Signs out the current Twitch session
2. Shows the admin login form

## Implementation

### File: `src/pages/Admin.tsx`

**Modify the Access Denied section (lines 1013-1029):**

Add a button that signs out the current user, which will then trigger the `AdminLoginForm` to display.

```tsx
// Only allow admins
if (!isAdmin) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="max-w-md text-center">
        <CardContent className="pt-6">
          <h2 className="mb-4 text-xl font-bold">Adgang Nægtet</h2>
          <p className="mb-4 text-muted-foreground">
            Du har ikke admin rettigheder.
          </p>
          <p className="mb-4 text-sm text-muted-foreground">
            Logget ind som: {user?.email}
          </p>
          <Button
            onClick={async () => {
              await signOut();
            }}
            className="w-full"
          >
            Log ud og log ind som admin
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

This requires extracting `signOut` from `useAuth()` in the `Admin` component.

**Update the Admin component to use signOut:**

```tsx
export default function Admin() {
  const { user, loading, isAdmin, signOut } = useAuth();
  // ... rest of component
}
```

---

## Technical Details

- **One file change:** `src/pages/Admin.tsx`
- **Simple addition:** Button triggers `signOut()` from existing `useAuth` hook
- **User flow after change:**
  1. User logged in with Twitch visits `/admin`
  2. Sees "Adgang Nægtet" with button "Log ud og log ind som admin"
  3. Clicks button → signs out
  4. Page re-renders → shows `AdminLoginForm`
  5. User enters admin credentials

