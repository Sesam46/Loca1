import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProductSchema, insertJobSchema, insertRequestSchema } from "@shared/routes";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCreateProduct } from "@/hooks/use-products";
import { useCreateJob } from "@/hooks/use-jobs";
import { useCreateRequest } from "@/hooks/use-requests";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";

// === CREATE PRODUCT ===
export function CreateProductModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const { toast } = useToast();
  const createProduct = useCreateProduct();
  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: {
      price: undefined,
      image: "https://placehold.co/400x300/e2e8f0/1e293b?text=Product",
    }
  });

  const onSubmit = (data: z.infer<typeof insertProductSchema>) => {
    createProduct.mutate(data, {
      onSuccess: () => {
        toast({ title: "Success", description: "Product listed successfully" });
        onOpenChange(false);
        form.reset();
      },
      onError: (e: any) => {
        toast({ title: "Error", description: e.message || "Failed to list product", variant: "destructive" });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Sell an Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {form.formState.errors.root && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 flex gap-2">
              <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>
            </div>
          )}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">Product Title</Label>
            <Input {...form.register("title")} placeholder="e.g. Vintage Camera" className="rounded-xl input-focus" data-testid="input-product-title" />
            {form.formState.errors.title && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {form.formState.errors.title.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">Price (Rands)</Label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-foreground font-semibold">R</span>
              <Input 
                type="number" 
                step="0.01"
                min="0"
                {...form.register("price", { valueAsNumber: true })} 
                placeholder="e.g. 500"
                className="rounded-xl input-focus pl-6" 
                data-testid="input-product-price"
                onKeyDown={(e) => {
                  if (!/[0-9.]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            {form.formState.errors.price && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {form.formState.errors.price.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">Description</Label>
            <Textarea {...form.register("description")} placeholder="Describe the condition, brand, specs..." className="rounded-xl input-focus min-h-20" data-testid="textarea-product-description" />
            {form.formState.errors.description && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {form.formState.errors.description.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">WhatsApp Number</Label>
            <Input {...form.register("whatsapp")} placeholder="27123456789" className="rounded-xl input-focus" data-testid="input-product-whatsapp" />
            {form.formState.errors.whatsapp && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {form.formState.errors.whatsapp.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">Image URL (Optional)</Label>
            <Input {...form.register("image")} placeholder="https://example.com/image.jpg" className="rounded-xl input-focus" data-testid="input-product-image" />
          </div>
          <Button type="submit" className="w-full rounded-xl h-10 font-semibold mt-6" disabled={createProduct.isPending} data-testid="button-submit-product">
            {createProduct.isPending ? "Listing..." : "List Product"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// === CREATE JOB ===
export function CreateJobModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const { toast } = useToast();
  const createJob = useCreateJob();
  const form = useForm<z.infer<typeof insertJobSchema>>({
    resolver: zodResolver(insertJobSchema),
  });

  const onSubmit = (data: z.infer<typeof insertJobSchema>) => {
    createJob.mutate(data, {
      onSuccess: () => {
        toast({ title: "Success", description: "Job posted successfully" });
        onOpenChange(false);
        form.reset();
      },
      onError: (e: any) => {
        toast({ title: "Error", description: e.message || "Failed to post job", variant: "destructive" });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Post a Job</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {form.formState.errors.root && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 flex gap-2">
              <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>
            </div>
          )}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">Job Title</Label>
            <Input {...form.register("title")} placeholder="e.g. Gardener needed" className="rounded-xl input-focus" data-testid="input-job-title" />
            {form.formState.errors.title && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {form.formState.errors.title.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">Salary/Rate</Label>
            <Input 
              {...form.register("salary")} 
              placeholder="e.g. R300/day or R100/hr" 
              className="rounded-xl input-focus" 
              data-testid="input-job-salary"
            />
            {form.formState.errors.salary && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {form.formState.errors.salary.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">Job Description</Label>
            <Textarea {...form.register("description")} placeholder="Job details, requirements, location..." className="rounded-xl input-focus min-h-20" data-testid="textarea-job-description" />
            {form.formState.errors.description && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {form.formState.errors.description.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">WhatsApp Number</Label>
            <Input {...form.register("whatsapp")} placeholder="27123456789" className="rounded-xl input-focus" data-testid="input-job-whatsapp" />
            {form.formState.errors.whatsapp && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {form.formState.errors.whatsapp.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full rounded-xl h-10 font-semibold mt-6" disabled={createJob.isPending} data-testid="button-submit-job">
            {createJob.isPending ? "Posting..." : "Post Job"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// === CREATE REQUEST ===
export function CreateRequestModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const { toast } = useToast();
  const createRequest = useCreateRequest();
  const form = useForm<z.infer<typeof insertRequestSchema>>({
    resolver: zodResolver(insertRequestSchema),
  });

  const onSubmit = (data: z.infer<typeof insertRequestSchema>) => {
    createRequest.mutate(data, {
      onSuccess: () => {
        toast({ title: "Success", description: "Request posted successfully" });
        onOpenChange(false);
        form.reset();
      },
      onError: (e: any) => {
        toast({ title: "Error", description: e.message || "Failed to post request", variant: "destructive" });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Make a Request</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {form.formState.errors.root && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 flex gap-2">
              <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>
            </div>
          )}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">What do you need?</Label>
            <Input {...form.register("title")} placeholder="e.g. Looking for a plumber" className="rounded-xl input-focus" data-testid="input-request-title" />
            {form.formState.errors.title && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {form.formState.errors.title.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">Budget (Optional)</Label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-foreground font-semibold">R</span>
              <Input 
                {...form.register("budget")} 
                type="text"
                placeholder="e.g. 500" 
                className="rounded-xl input-focus pl-6" 
                data-testid="input-request-budget"
              />
            </div>
            {form.formState.errors.budget && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {form.formState.errors.budget.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">Details</Label>
            <Textarea {...form.register("description")} placeholder="Describe what you need, location, timeline..." className="rounded-xl input-focus min-h-20" data-testid="textarea-request-description" />
            {form.formState.errors.description && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {form.formState.errors.description.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full rounded-xl h-10 font-semibold mt-6" disabled={createRequest.isPending} data-testid="button-submit-request">
            {createRequest.isPending ? "Posting..." : "Post Request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
