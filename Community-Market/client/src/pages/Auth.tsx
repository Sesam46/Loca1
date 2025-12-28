import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/routes";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BottomNav } from "@/components/BottomNav";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function AuthPage() {
  const { login, register } = useAuth();
  const [activeTab, setActiveTab] = useState("login");

  const loginForm = useForm<z.infer<typeof insertUserSchema>>({
    resolver: zodResolver(insertUserSchema),
  });

  const registerForm = useForm<z.infer<typeof insertUserSchema>>({
    resolver: zodResolver(insertUserSchema),
  });

  const onLogin = (data: z.infer<typeof insertUserSchema>) => {
    loginForm.clearErrors();
    login.mutate(data, {
      onError: (error: any) => {
        if (error.message.includes("username")) {
          loginForm.setError("username", { message: error.message });
        } else {
          loginForm.setError("password", { message: "Invalid credentials" });
        }
      },
    });
  };

  const onRegister = (data: z.infer<typeof insertUserSchema>) => {
    registerForm.clearErrors();
    register.mutate(data, {
      onError: (error: any) => {
        if (error.message.includes("username")) {
          registerForm.setError("username", { message: "Username already exists or is invalid" });
        } else {
          registerForm.setError("root", { message: error.message });
        }
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-white p-4 pb-24 flex items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-black font-display text-foreground">Loca</h1>
          <p className="text-lg text-muted-foreground">Buy, sell, and find work in your community</p>
        </div>

        <Card className="border-none shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-white pb-4">
            <CardTitle className="text-center text-xl">Get Started</CardTitle>
            <CardDescription className="text-center">Join thousands of community members</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 rounded-xl bg-slate-100 p-1">
                <TabsTrigger value="login" className="rounded-lg font-semibold">Login</TabsTrigger>
                <TabsTrigger value="register" className="rounded-lg font-semibold">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                  {loginForm.formState.errors.root && (
                    <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 flex gap-2">
                      <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-destructive">{loginForm.formState.errors.root.message}</p>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-semibold">Username</Label>
                    <Input 
                      id="username" 
                      placeholder="Enter your username"
                      {...loginForm.register("username")} 
                      className="rounded-xl input-focus"
                    />
                    {loginForm.formState.errors.username && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {loginForm.formState.errors.username.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Enter your password"
                      {...loginForm.register("password")} 
                      className="rounded-xl input-focus"
                    />
                    {loginForm.formState.errors.password && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {loginForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="w-full rounded-xl h-10 font-semibold text-md" disabled={login.isPending}>
                    {login.isPending ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                  {registerForm.formState.errors.root && (
                    <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 flex gap-2">
                      <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-destructive">{registerForm.formState.errors.root.message}</p>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="reg-username" className="text-sm font-semibold">Create Username</Label>
                    <Input 
                      id="reg-username" 
                      placeholder="3-20 characters, letters/numbers/underscore only"
                      {...registerForm.register("username")} 
                      className="rounded-xl input-focus"
                    />
                    {registerForm.formState.errors.username && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {registerForm.formState.errors.username.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password" className="text-sm font-semibold">Create Password</Label>
                    <Input 
                      id="reg-password" 
                      type="password" 
                      placeholder="Min 6 chars, 1 uppercase, 1 number"
                      {...registerForm.register("password")} 
                      className="rounded-xl input-focus"
                    />
                    {registerForm.formState.errors.password && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {registerForm.formState.errors.password.message}
                      </p>
                    )}
                    <div className="space-y-1 mt-3 bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs font-semibold text-foreground">Password requirements:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-primary" /> At least 6 characters
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-primary" /> 1 uppercase letter (A-Z)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-primary" /> 1 number (0-9)
                        </li>
                      </ul>
                    </div>
                  </div>
                  <Button type="submit" className="w-full rounded-xl h-10 font-semibold text-md" disabled={register.isPending}>
                    {register.isPending ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <BottomNav />
    </div>
  );
}
