import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import { useRequests } from "@/hooks/use-requests";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { CreateRequestModal } from "@/components/CreateModals";
import { Skeleton } from "@/components/ui/skeleton";

export default function RequestsPage() {
  const { data: requests, isLoading } = useRequests();
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  const filteredRequests = requests?.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase()) || 
    r.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Header 
        title="Community Requests" 
        onSearch={setSearch}
        action={user && (
          <Button size="icon" className="rounded-full shadow-lg h-8 w-8" onClick={() => setOpenModal(true)}>
            <Plus className="w-5 h-5" />
          </Button>
        )}
      />

      <div className="max-w-xl mx-auto px-4 mt-6 space-y-4">
        {isLoading ? (
          [1,2,3].map(i => <Skeleton key={i} className="h-32 rounded-2xl w-full" />)
        ) : (
          filteredRequests?.map(request => (
            <RequestCard key={request.id} request={request} />
          ))
        )}

        {!isLoading && filteredRequests?.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No requests found. Be the first to ask!
          </div>
        )}
      </div>

      <CreateRequestModal open={openModal} onOpenChange={setOpenModal} />
      <BottomNav />
    </div>
  );
}

function RequestCard({ request }: { request: any }) {
  return (
    <Card className="border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl bg-white w-full">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3 gap-3">
          <h3 className="font-bold text-base text-foreground leading-tight">{request.title}</h3>
          {request.budget && (
             <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg whitespace-nowrap flex-shrink-0">
               {request.budget}
             </span>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          {request.description}
        </p>
      </CardContent>
    </Card>
  );
}
