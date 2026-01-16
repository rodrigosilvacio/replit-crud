import { useState } from "react";
import { useContacts, useCreateContact } from "@/hooks/use-contacts";
import { ContactCard } from "@/components/ContactCard";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search, Users, Loader2 } from "lucide-react";

export default function Contacts() {
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { data: contacts, isLoading, error } = useContacts(search);
  const createMutation = useCreateContact();

  const handleCreate = (data: any) => {
    createMutation.mutate(data, {
      onSuccess: () => setIsCreateOpen(false),
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Contatos
            </h1>
            <p className="mt-2 text-slate-500 text-lg">
              Gerencie seus contatos profissionais e empresas.
            </p>
          </div>

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200">
                <Plus className="mr-2 h-5 w-5" />
                Novo Contato
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-display">Adicionar Novo Contato</DialogTitle>
              </DialogHeader>
              <ContactForm
                onSubmit={handleCreate}
                isPending={createMutation.isPending}
                submitLabel="Criar Contato"
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <Input
            type="text"
            placeholder="Pesquisar por nome, cargo ou empresa..."
            className="pl-11 py-6 text-lg bg-white border-slate-200 shadow-sm rounded-xl focus:ring-primary/20 focus:border-primary transition-all duration-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
            <p className="text-slate-500 animate-pulse">Carregando contatos...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-red-100">
            <p className="text-red-500 font-medium">Erro ao carregar contatos</p>
            <p className="text-slate-500 mt-2 text-sm">{error.message}</p>
          </div>
        ) : contacts?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-slate-200 text-center">
            <div className="bg-slate-50 p-4 rounded-full mb-4">
              <Users className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Nenhum contato encontrado
            </h3>
            <p className="text-slate-500 max-w-sm mx-auto mb-6">
              {search 
                ? "Tente buscar por outro termo ou limpe a pesquisa." 
                : "Comece adicionando seu primeiro contato profissional."}
            </p>
            {search && (
              <Button variant="outline" onClick={() => setSearch("")}>
                Limpar Pesquisa
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts?.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
