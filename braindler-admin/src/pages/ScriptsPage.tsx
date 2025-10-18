import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { scriptsApi, AicsScript } from '@/services/apiService';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ScriptsPage = () => {
  const [editingScript, setEditingScript] = React.useState<AicsScript | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({ name: '', jsonData: '' });
  
  const queryClient = useQueryClient();

  const { data: scripts = [], isLoading } = useQuery({
    queryKey: ['scripts'],
    queryFn: scriptsApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: scriptsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scripts'] });
      toast.success('Script created successfully');
      setIsDialogOpen(false);
      setFormData({ name: '', jsonData: '' });
    },
    onError: () => {
      toast.error('Failed to create script');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => scriptsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scripts'] });
      toast.success('Script updated successfully');
      setIsDialogOpen(false);
      setEditingScript(null);
      setFormData({ name: '', jsonData: '' });
    },
    onError: () => {
      toast.error('Failed to update script');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: scriptsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scripts'] });
      toast.success('Script deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete script');
    },
  });

  const handleCreate = () => {
    setEditingScript(null);
    setFormData({ name: '', jsonData: '' });
    setIsDialogOpen(true);
  };

  const handleEdit = (script: AicsScript) => {
    setEditingScript(script);
    setFormData({
      name: script.name,
      jsonData: JSON.stringify(script.jsonData, null, 2),
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    try {
      const jsonData = JSON.parse(formData.jsonData || '{}');
      const data = { name: formData.name, jsonData };

      if (editingScript) {
        updateMutation.mutate({ id: editingScript.id, data });
      } else {
        createMutation.mutate(data);
      }
    } catch (error) {
      toast.error('Invalid JSON format');
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">AICS Scripts</h2>
            <p className="text-muted-foreground">
              Manage AI Chat Scripts for your bot
            </p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            New Script
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Scripts</CardTitle>
            <CardDescription>
              AI Chat Scripts define your bot's conversation behavior
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div>Loading...</div>
            ) : scripts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No scripts found. Create your first script to get started.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scripts.map((script) => (
                    <TableRow key={script.id}>
                      <TableCell>{script.id}</TableCell>
                      <TableCell className="font-medium">{script.name}</TableCell>
                      <TableCell>{new Date(script.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(script.updatedAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(script)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this script?')) {
                                deleteMutation.mutate(script.id);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingScript ? 'Edit Script' : 'Create New Script'}
              </DialogTitle>
              <DialogDescription>
                Define the AI conversation script behavior
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter script name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">JSON Data</label>
                <Textarea
                  value={formData.jsonData}
                  onChange={(e) => setFormData({ ...formData, jsonData: e.target.value })}
                  placeholder='{"type": "greeting", "content": "Hello!"}'
                  className="font-mono min-h-[200px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {editingScript ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default ScriptsPage;

