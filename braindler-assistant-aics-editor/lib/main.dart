import 'package:flutter/material.dart';
import 'screens/editor_screen.dart';

void main() {
  runApp(const AicsEditorApp());
}

class AicsEditorApp extends StatelessWidget {
  const AicsEditorApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Braindler AICS Editor',
      theme: ThemeData(primarySwatch: Colors.indigo),
      home: const EditorScreen(),
    );
  }
}