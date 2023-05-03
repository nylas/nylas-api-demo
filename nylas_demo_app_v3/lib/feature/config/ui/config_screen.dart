import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class ConfigScreen extends StatefulWidget {
  const ConfigScreen({super.key});

  @override
  _ConfigListState createState() => _ConfigListState();
}

class _ConfigListState extends State<ConfigScreen> {
  List<String> items = [];

  // Add an item to the list
  void addItem(String item) {
    setState(() {
      items.add(item);
    });
  }

  // Remove an item from the list
  void removeItem(int index) {
    setState(() {
      items.removeAt(index);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: items.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text(items[index]),
                  trailing: IconButton(
                    icon: Icon(Icons.delete),
                    onPressed: () {
                      removeItem(index);
                    },
                  ),
                );
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    decoration: InputDecoration(
                      hintText: 'Enter an item',
                    ),
                    onSubmitted: (value) {
                      addItem(value);
                    },
                  ),
                ),
                SizedBox(width: 8.0),
                ElevatedButton(
                  child: Text('Add'),
                  onPressed: () {
                    if (items.length < 10) {
                      addItem('Item ${items.length + 1}');
                    }
                  },
                ),
              ],
            ),
          ),
        ],
      );
  }
}