import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const DialogsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dialogs</h2>
          <p className="text-muted-foreground">
            View and analyze conversation history
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Conversation History</CardTitle>
            <CardDescription>
              All user conversations with your AI bot
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              No dialogs found. Dialog history will appear here.
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DialogsPage;


