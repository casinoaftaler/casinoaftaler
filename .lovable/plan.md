

## Plan: Add Moderator Role

### Overview
Create a "moderator" role that can log in on the admin page but only access "Requests" and "Bonus Hunt" tabs. Admins can create moderators from the "Brugere" section, just like creating admins.

### Database Changes

1. **Alter the `app_role` enum** to add `'moderator'`:
   ```sql
   ALTER TYPE public.app_role ADD VALUE 'moderator';
   ```

2. **Update `has_role` function** — no changes needed, it already works with any `app_role` value.

### Edge Function Changes

3. **Update `create-admin-user/index.ts`** to accept a `role` parameter (default `"admin"`), allowing creation of moderator users with the `moderator` role.

4. **Update `delete-admin-user/index.ts`** to accept a `role` parameter so moderators can also be removed.

### Auth Hook Changes

5. **Update `useAuth.ts`**:
   - Add `isModerator` state alongside `isAdmin`
   - Check for both `admin` and `moderator` roles after auth state change
   - Expose `isModerator` from the hook

### Admin Page Changes

6. **Update `Admin.tsx`**:
   - Allow access if user is admin OR moderator (`!isAdmin && !isModerator` → deny)
   - Filter `navItems` based on role: moderators only see `"requests"` and `"bonus-hunt"`
   - Show appropriate "Access Denied" message for moderators trying to access locked tabs

### User Management UI Changes

7. **Update `AdminUserManagement.tsx`**:
   - Add a role selector (Admin / Moderator) in the create dialog
   - Pass `role` to the edge function
   - Show role badge (Admin/Moderator) in the user list
   - Fetch both admin and moderator users (update `get_admin_users_with_email` or create a new RPC)

### Database Function Changes

8. **Update `get_admin_users_with_email`** to return both admin and moderator roles (remove the `WHERE ur.role = 'admin'` filter, or add `WHERE ur.role IN ('admin', 'moderator')`).

### Technical Details

- The `app_role` enum addition is a non-breaking change
- Moderator users are stored in the same `user_roles` table with `role = 'moderator'`
- Nav filtering is done client-side by checking the role; RLS already protects backend data
- The moderator tabs are: `bonus-hunt` and `requests` only

### Files to modify:
- `src/hooks/useAuth.ts` — add `isModerator`
- `src/pages/Admin.tsx` — role-based nav filtering + access gate
- `src/components/AdminUserManagement.tsx` — role selector in create form
- `supabase/functions/create-admin-user/index.ts` — accept `role` param
- `supabase/functions/delete-admin-user/index.ts` — accept `role` param
- 1 migration: add `moderator` to enum + update RPC

