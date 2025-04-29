import 'package:flutter/material.dart';
import 'screens/dashboard_screen.dart';

void main() {
  runApp(const AdminApp());
}

class AdminApp extends StatelessWidget {
  const AdminApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Braindler Admin',
      theme: ThemeData(primarySwatch: Colors.blueGrey),
      home: const DashboardScreen(),
    );
  }
}