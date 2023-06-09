import 'package:bloc/bloc.dart';
import 'package:nylas_demo_app_v3/constants.dart';
import 'package:flutter_web_auth_2/flutter_web_auth_2.dart';
import 'package:http/http.dart' as http;
import 'dart:convert' show jsonDecode;

class GoogleAuthCubit extends Cubit<bool> {
  GoogleAuthCubit() : super(false);

  void signInWithGoogle() async {
    final url = Uri.http(apiBaseURI, authPath, {
      'client_id': clientID,
      'provider': 'google',
      'response_type': 'code',
      'access_type': 'offline',
      'scope': scope,
      'state': '123',
      'redirect_uri': redirectUri
    });

    final result = await FlutterWebAuth2.authenticate(url: url.toString(), callbackUrlScheme: 'http');
    print(result);

    final code = Uri.parse(result).queryParameters['code'];

    final tokenUrl = Uri.https(apiBaseURI, 'v3/connect/token');

    final response = await http.post(tokenUrl, body: {
      'client_id': clientID,
      'redirect_uri': redirectUri,
      'grant_type': 'authorization_code',
      'code': code,
    });

    final accessToken = jsonDecode(response.body)['access_token'] as String;
    print(accessToken);
  }
}
