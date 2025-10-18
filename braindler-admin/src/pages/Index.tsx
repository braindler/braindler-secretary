import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, MessageSquare, FolderOpen, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardCard: React.FC<{
  icon: React.ElementType;
  title: string;
  description: string;
  to: string;
}> = ({ icon: Icon, title, description, to }) => (
  <Link to={to}>
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon className="h-6 w-6 text-primary" />
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  </Link>
);

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome to Braindler Admin - AI Secretary Management System
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            icon={FileText}
            title="AICS Scripts"
            description="Manage AI Chat Scripts"
            to="/scripts"
          />
          <DashboardCard
            icon={MessageSquare}
            title="Dialogs"
            description="View conversation history"
            to="/dialogs"
          />
          <DashboardCard
            icon={FolderOpen}
            title="Documents"
            description="Manage knowledge base"
            to="/documents"
          />
          <DashboardCard
            icon={Activity}
            title="Monitoring"
            description="System metrics & analytics"
            to="/monitoring"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              Quick guide to using Braindler Admin
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">
              • <strong>AICS Scripts:</strong> Create and manage AI conversation scripts for your bot
            </p>
            <p className="text-sm">
              • <strong>Dialogs:</strong> Review and analyze conversation history with users
            </p>
            <p className="text-sm">
              • <strong>Documents:</strong> Build and maintain your bot's knowledge base
            </p>
            <p className="text-sm">
              • <strong>Monitoring:</strong> Track system performance and user engagement
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Index;

