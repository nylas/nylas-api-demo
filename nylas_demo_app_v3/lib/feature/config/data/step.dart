class Step {
  final String title;
  final String description;
  final bool completed;
  final String userInput;

  Step({
    required this.title,
    required this.description,
    this.completed = false,
    this.userInput = '',
  });

  Step copyWith({
    String? title,
    String? description,
    bool? completed,
    String? userInput,
  }) {
    return Step(
      title: title ?? this.title,
      description: description ?? this.description,
      completed: completed ?? this.completed,
      userInput: userInput ?? this.userInput,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'title': title,
      'description': description,
      'completed': completed,
      'userInput': userInput,
    };
  }

  factory Step.fromJson(Map<String, dynamic> json) {
    return Step(
      title: json['title'],
      description: json['description'],
      completed: json['completed'],
      userInput: json['userInput'],
    );
  }
}