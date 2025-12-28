import { useAuth } from "@/hooks/use-auth";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Plus, ShoppingBag, Briefcase, FileQuestion } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { CreateProductModal, CreateJobModal, CreateRequestModal } from "@/components/CreateModals";
import { useProducts, useDeleteProduct } from "@/hooks/use-products";
import { useJobs, useDeleteJob } from "@/hooks/use-jobs";
import { useRequests, useDeleteRequest } from "@/hooks/use-requests";

export default function HomePage() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  if (user) {
    return <Dashboard user={user} logout={logout.mutate} />;
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-white to-white pt-16 pb-12 px-4 text-center">
        <h1 className="text-6xl font-black font-display text-foreground tracking-tighter mb-3">Loca</h1>
        <p className="text-lg text-muted-foreground font-medium max-w-sm mx-auto mb-2">
          Buy, sell, and find work from your neighbors. All in one place.
        </p>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-8">
          Join thousands already earning and saving in their community
        </p>
        <div className="mt-8 flex gap-3 justify-center flex-col sm:flex-row">
          <Button size="lg" className="rounded-2xl shadow-lg shadow-primary/25 px-8 font-semibold h-11" onClick={() => setLocation("/auth")}>
            Sign Up Free
          </Button>
          <Button size="lg" variant="outline" className="rounded-2xl border-2 border-primary px-8 font-semibold text-primary hover:bg-primary/5 h-11" onClick={() => setLocation("/products")}>
            Explore Listings
          </Button>
        </div>
      </div>


      {/* Feature Cards */}
      <div className="px-4 space-y-4 max-w-md mx-auto mb-8">
        <FeatureCard 
          icon={ShoppingBag} 
          title="Smart Marketplace" 
          desc="Discover deals from verified neighbors nearby"
          color="bg-blue-100 text-blue-600"
          href="/products"
        />
        <FeatureCard 
          icon={Briefcase} 
          title="Earn on Jobs & Gigs" 
          desc="Find flexible work or hire local talent"
          color="bg-blue-100 text-blue-600"
          href="/jobs"
        />
        <FeatureCard 
          icon={FileQuestion} 
          title="Post Requests" 
          desc="Ask your community for help or services"
          color="bg-blue-100 text-blue-600"
          href="/requests"
        />
      </div>

      {/* How It Works */}
      <div className="px-4 max-w-md mx-auto mb-8">
        <h2 className="text-2xl font-bold font-display text-foreground mb-4 text-center">How It Works</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <h3 className="font-semibold text-foreground">Create Account</h3>
              <p className="text-sm text-muted-foreground">Sign up with username and password</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
            <div>
              <h3 className="font-semibold text-foreground">List or Browse</h3>
              <p className="text-sm text-muted-foreground">Sell items, post jobs, or browse listings</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
            <div>
              <h3 className="font-semibold text-foreground">Connect via WhatsApp</h3>
              <p className="text-sm text-muted-foreground">Message directly and arrange a deal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="px-4 max-w-md mx-auto mb-8">
        <h2 className="text-2xl font-bold font-display text-foreground mb-4 text-center">Why Loca</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-primary/5 rounded-xl p-4 text-center">
            <p className="text-sm font-semibold text-foreground mb-1">Hyperlocal</p>
            <p className="text-xs text-muted-foreground">Connect with nearby community members</p>
          </div>
          <div className="bg-primary/5 rounded-xl p-4 text-center">
            <p className="text-sm font-semibold text-foreground mb-1">No Fees</p>
            <p className="text-xs text-muted-foreground">Keep 100% of your earnings</p>
          </div>
          <div className="bg-primary/5 rounded-xl p-4 text-center">
            <p className="text-sm font-semibold text-foreground mb-1">Safe & Simple</p>
            <p className="text-xs text-muted-foreground">Direct messaging, zero complexity</p>
          </div>
          <div className="bg-primary/5 rounded-xl p-4 text-center">
            <p className="text-sm font-semibold text-foreground mb-1">Fast & Mobile</p>
            <p className="text-xs text-muted-foreground">Built for mobile, works everywhere</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 max-w-md mx-auto mb-8">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 text-center border border-primary/20">
          <h2 className="text-xl font-bold text-foreground mb-2">Ready to get started?</h2>
          <p className="text-sm text-muted-foreground mb-4">Join your community marketplace today</p>
          <Button className="w-full rounded-xl h-10 font-semibold" onClick={() => setLocation("/auth")}>
            Create Free Account
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, color, href }: any) {
  return (
    <Link href={href}>
      <Card className="border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer rounded-2xl overflow-hidden bg-white">
        <CardContent className="p-5 flex items-center gap-4">
          <div className={`p-3 rounded-xl ${color} flex-shrink-0`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-base text-foreground">{title}</h3>
            <p className="text-muted-foreground text-sm leading-snug">{desc}</p>
          </div>
          <div className="text-primary flex-shrink-0">→</div>
        </CardContent>
      </Card>
    </Link>
  );
}

// === DASHBOARD (LOGGED IN) ===
function Dashboard({ user, logout }: { user: any, logout: () => void }) {
  const [activeTab, setActiveTab] = useState("products");
  const [openProductModal, setOpenProductModal] = useState(false);
  const [openJobModal, setOpenJobModal] = useState(false);
  const [openRequestModal, setOpenRequestModal] = useState(false);

  // Data hooks
  const { data: products } = useProducts();
  const { data: jobs } = useJobs();
  const { data: requests } = useRequests();

  // Filter for current user
  const myProducts = products?.filter(p => p.sellerId === user.id) || [];
  const myJobs = jobs?.filter(j => j.employerId === user.id) || [];
  const myRequests = requests?.filter(r => r.requesterId === user.id) || [];

  // Delete hooks
  const deleteProduct = useDeleteProduct();
  const deleteJob = useDeleteJob();
  const deleteRequest = useDeleteRequest();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/2 to-white pb-24">
      <div className="bg-white border-b border-slate-100 p-6 pb-8 shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold font-display text-foreground">Welcome back, {user.username}</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage all your listings in one place</p>
          </div>
          <Button variant="ghost" size="icon" onClick={logout} className="rounded-full hover:bg-slate-50 text-muted-foreground hover:text-foreground">
            <LogOut className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex gap-2 mt-6 overflow-x-auto pb-2 no-scrollbar">
           <Button className="rounded-2xl flex-shrink-0 font-semibold shadow-sm hover:shadow-md" onClick={() => setOpenProductModal(true)}>
            <Plus className="w-4 h-4 mr-2" /> Sell Item
           </Button>
           <Button className="rounded-2xl flex-shrink-0 font-semibold shadow-sm hover:shadow-md variant-secondary" variant="outline" onClick={() => setOpenJobModal(true)}>
            <Plus className="w-4 h-4 mr-2" /> Post Job
           </Button>
           <Button className="rounded-2xl flex-shrink-0 font-semibold shadow-sm hover:shadow-md variant-outline" variant="outline" onClick={() => setOpenRequestModal(true)}>
            <Plus className="w-4 h-4 mr-2" /> Post Request
           </Button>
        </div>
      </div>

      <div className="px-4 mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white p-1 rounded-xl shadow-sm w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="products" className="rounded-lg">Items</TabsTrigger>
            <TabsTrigger value="jobs" className="rounded-lg">Jobs</TabsTrigger>
            <TabsTrigger value="requests" className="rounded-lg">Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-3">
            {myProducts.length === 0 && <EmptyState message="No items listed yet" />}
            {myProducts.map(item => (
              <DashboardItem 
                key={item.id} 
                title={item.title} 
                subtitle={`R${item.price}`}
                onDelete={() => deleteProduct.mutate(item.id)}
                isDeleting={deleteProduct.isPending}
              />
            ))}
          </TabsContent>

          <TabsContent value="jobs" className="space-y-3">
            {myJobs.length === 0 && <EmptyState message="No jobs posted yet" />}
            {myJobs.map(item => (
              <DashboardItem 
                key={item.id} 
                title={item.title} 
                subtitle={item.salary}
                onDelete={() => deleteJob.mutate(item.id)}
                isDeleting={deleteJob.isPending}
              />
            ))}
          </TabsContent>

          <TabsContent value="requests" className="space-y-3">
            {myRequests.length === 0 && <EmptyState message="No requests made yet" />}
            {myRequests.map(item => (
              <DashboardItem 
                key={item.id} 
                title={item.title} 
                subtitle={item.budget ? `Budget: ${item.budget}` : "No budget specified"}
                onDelete={() => deleteRequest.mutate(item.id)}
                isDeleting={deleteRequest.isPending}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <CreateProductModal open={openProductModal} onOpenChange={setOpenProductModal} />
      <CreateJobModal open={openJobModal} onOpenChange={setOpenJobModal} />
      <CreateRequestModal open={openRequestModal} onOpenChange={setOpenRequestModal} />

      <BottomNav />
    </div>
  );
}

function DashboardItem({ title, subtitle, onDelete, isDeleting }: any) {
  return (
    <Card className="rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow bg-white">
      <CardContent className="p-4 flex justify-between items-center">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <Button 
          variant="destructive" 
          size="sm" 
          className="h-8 rounded-lg px-3 text-xs ml-3 flex-shrink-0"
          onClick={onDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "..." : "Delete"}
        </Button>
      </CardContent>
    </Card>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-12 text-muted-foreground bg-white/50 rounded-2xl border border-dashed border-border">
      <p>{message}</p>
    </div>
  );
}
