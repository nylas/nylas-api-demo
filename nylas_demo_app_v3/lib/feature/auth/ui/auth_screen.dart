import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:nylas_demo_app_v3/resources/strings.dart';

class AuthScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(AppStrings.welcome),
      ),
      body: const Center(
        child: Text(AppStrings.welcome),
      ),
    );
  }
}