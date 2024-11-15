'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { UpdateNameForm } from './update-name-form';
import { UpdatePasswordForm } from './update-password-form';
import { authClient } from '@/lib/auth-client';

export default function Profile() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
  } = authClient.useSession();

  if (!session) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>View and manage your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Personal Information</TabsTrigger>
              <TabsTrigger value="name">Update Name</TabsTrigger>
              <TabsTrigger value="password">Update Password</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <div className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <p className="text-lg">{session.user.name}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="text-lg">{session.user.email}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="name">
              <UpdateNameForm defaultValue={session.user.name} />
            </TabsContent>
            <TabsContent value="password">
              <UpdatePasswordForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
