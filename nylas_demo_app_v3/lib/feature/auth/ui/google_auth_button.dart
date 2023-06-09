import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nylas_demo_app_v3/feature/auth/domain/google_auth_cubit.dart';

class GoogleAuthButton extends StatelessWidget {
  const GoogleAuthButton({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocListener<GoogleAuthCubit, bool>(
      listener: (context, state) {
        if (state) {
          // Display loading indicator or something similar
        } else {
          // Hide loading indicator or handle any errors
        }
      },
      child: ElevatedButton(
        onPressed: () {
          context.read<GoogleAuthCubit>().signInWithGoogle();
        },
        child: const Text('Sign in with Google'),
      ),
    );
  }
}
