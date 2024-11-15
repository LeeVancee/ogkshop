'use client';
import { LogOut, ShoppingBag, LayoutDashboard, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export function DropDown() {
  const router = useRouter();

  const { data: session, isPending, error } = authClient.useSession();

  const handleLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
        },
      },
    });
  };

  if (!session) {
    return (
      <Button variant="ghost" onClick={() => router.push('/auth')}>
        login
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session?.user?.image ?? ''} alt={session?.user?.name ?? ''} />
            <AvatarFallback>{session?.user?.name?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{session?.user?.email}</p>
          </div>
        </DropdownMenuLabel>
        {session?.user?.role === 'admin' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/dashboard')}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuItem onClick={() => router.push('/myorders')}>
          <ShoppingBag className="mr-2 h-4 w-4" />
          My Orders
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/profile')}>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
