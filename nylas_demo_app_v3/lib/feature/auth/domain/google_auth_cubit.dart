import 'package:bloc/bloc.dart';
import 'package:url_launcher/url_launcher.dart';

class GoogleAuthCubit extends Cubit<bool> {
  GoogleAuthCubit() : super(false);

  void signInWithGoogle() async {
    final googleSignInUri = Uri.parse('https://www.google.com/');
    final canLaunchUri = await canLaunchUrl(googleSignInUri);
    if (canLaunchUri) {
      emit(true);
      await launch(googleSignInUri.toString());
    } else {
      emit(false);
    }
  }
}
