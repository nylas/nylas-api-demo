import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:nylas_demo_app_v3/feature/auth/ui/google_auth_button.dart';

class AuthScreen extends StatelessWidget {
  const AuthScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const GoogleAuthButton();
  }
}