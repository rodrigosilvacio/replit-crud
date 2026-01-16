import { type Contact } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Phone, Briefcase, Building2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ContactForm } from "./ContactForm";
import { useUpdateContact, useDeleteContact } from "@/hooks/use-contacts";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ContactCardProps {
  contact: Contact;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ContactCard({ contact }: ContactCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const updateMutation = useUpdateContact();
  const deleteMutation = useDeleteContact();

  const handleUpdate = (data: any) => {
    updateMutation.mutate(
      { id: contact.id, ...data },
      {
        onSuccess: () => setIsEditOpen(false),
      }
    );
  };

  const handleDelete = () => {
    deleteMutation.mutate(contact.id);
  };

  return (
    <div className="group relative bg-card rounded-xl p-6 border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/20">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-primary/10">
            <AvatarFallback className="bg-primary/5 text-primary font-bold">
              {getInitials(contact.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-display font-semibold text-lg text-foreground">
              {contact.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
              <Building2 className="h-3.5 w-3.5" />
              <span>{contact.company}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3 text-sm text-foreground/80">
          <div className="p-2 rounded-lg bg-secondary/50 text-secondary-foreground">
            <Briefcase className="h-4 w-4" />
          </div>
          <span className="font-medium">{contact.title}</span>
        </div>
        
        <div className="flex items-center gap-3 text-sm text-foreground/80">
          <div className="p-2 rounded-lg bg-secondary/50 text-secondary-foreground">
            <Phone className="h-4 w-4" />
          </div>
          <span className="font-medium font-mono">{contact.phone}</span>
        </div>
      </div>

      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm"
            >
              <Edit2 className="h-4 w-4 text-slate-600" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Editar Contato</DialogTitle>
            </DialogHeader>
            <ContactForm
              defaultValues={contact}
              onSubmit={handleUpdate}
              isPending={updateMutation.isPending}
              submitLabel="Salvar Alterações"
            />
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 bg-white hover:bg-red-50 border border-slate-200 shadow-sm hover:border-red-200"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir contato?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser desfeita. Isso excluirá permanentemente o contato de {contact.name}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              >
                {deleteMutation.isPending ? "Excluindo..." : "Excluir"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
