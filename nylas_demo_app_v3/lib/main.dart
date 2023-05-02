import 'package:flutter/material.dart';
import 'package:nylas_demo_app_v3/feature/auth/ui/auth_screen.dart';
import 'package:nylas_demo_app_v3/resources/colors.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          backgroundColor: AppColors.primaryColor,
          title: Row(
            children: [
              Expanded(child: Align(
                  alignment: Alignment.centerLeft,
                  child: Image.asset("assets/nylas-logo-white.png", height: 25))
              )
            ],
          )
        ),
        body: const Center(
          child: AuthScreen()
        ),
      ),
    );
  }
}