import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import { useProducts } from "@/hooks/use-products";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Plus } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { CreateProductModal } from "@/components/CreateModals";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsPage() {
  const { data: products, isLoading } = useProducts();
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  const filteredProducts = products?.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Header 
        title="Marketplace" 
        onSearch={setSearch} 
        action={user && (
          <Button size="icon" className="rounded-full shadow-lg h-8 w-8" onClick={() => setOpenModal(true)}>
            <Plus className="w-5 h-5" />
          </Button>
        )}
      />

      <div className="max-w-7xl mx-auto px-4 mt-6">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1,2,3,4,5,6].map(i => <ProductSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts?.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        {!isLoading && filteredProducts?.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No products found matching your search.
          </div>
        )}
      </div>

      <CreateProductModal open={openModal} onOpenChange={setOpenModal} />
      <BottomNav />
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  const whatsappUrl = `https://wa.me/${product.whatsapp}?text=Hi, I'm interested in your ${product.title} listed on Loca.`;

  return (
    <Card className="border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl overflow-hidden flex flex-col h-full bg-white group">
      <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 relative">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg shadow-primary/20">
          R{product.price}
        </div>
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-2 text-foreground">{product.title}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-grow leading-relaxed">{product.description}</p>
        
        <Button 
          className="w-full rounded-xl h-9 text-sm font-semibold bg-primary text-primary-foreground hover:bg-blue-700 shadow-sm"
          onClick={() => window.open(whatsappUrl, '_blank')}
        >
          <MessageCircle className="w-4 h-4 mr-2" /> Contact Seller
        </Button>
      </CardContent>
    </Card>
  );
}

function ProductSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-32 w-full rounded-2xl" />
      <Skeleton className="h-4 w-3/4 rounded-md" />
      <Skeleton className="h-3 w-1/2 rounded-md" />
    </div>
  );
}
