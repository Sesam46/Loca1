import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import { useJobs } from "@/hooks/use-jobs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Plus } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { CreateJobModal } from "@/components/CreateModals";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobsPage() {
  const { data: jobs, isLoading } = useJobs();
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  const filteredJobs = jobs?.filter(j => 
    j.title.toLowerCase().includes(search.toLowerCase()) || 
    j.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Header 
        title="Jobs & Gigs" 
        onSearch={setSearch}
        action={user && (
          <Button size="icon" className="rounded-full shadow-lg h-8 w-8" onClick={() => setOpenModal(true)}>
            <Plus className="w-5 h-5" />
          </Button>
        )}
      />

      <div className="max-w-7xl mx-auto px-4 mt-6">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-40 rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredJobs?.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        {!isLoading && filteredJobs?.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No jobs found matching your search.
          </div>
        )}
      </div>

      <CreateJobModal open={openModal} onOpenChange={setOpenModal} />
      <BottomNav />
    </div>
  );
}

function JobCard({ job }: { job: any }) {
  const whatsappUrl = `https://wa.me/${job.whatsapp}?text=Hi, I'm interested in the job "${job.title}" listed on Loca.`;

  return (
    <Card className="border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl bg-white overflow-hidden flex flex-col h-full">
      <CardContent className="p-5 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3 gap-3">
          <h3 className="font-bold text-base text-foreground leading-tight">{job.title}</h3>
          <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap flex-shrink-0">
            {job.salary}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-5 flex-grow line-clamp-4 leading-relaxed">
          {job.description}
        </p>
        
        <Button 
          className="w-full rounded-xl h-9 font-semibold bg-primary text-primary-foreground hover:bg-blue-700 shadow-sm"
          onClick={() => window.open(whatsappUrl, '_blank')}
        >
          <MessageCircle className="w-4 h-4 mr-2" /> Contact Employer
        </Button>
      </CardContent>
    </Card>
  );
}
