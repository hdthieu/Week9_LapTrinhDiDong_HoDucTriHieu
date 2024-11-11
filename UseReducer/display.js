import { StatusBar } from 'expo-status-bar';
import { useReducer, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Alert,
    Image,
    TextInput
} from 'react-native';

const Item = ({ title, id, onEdit, onDelete }) => (
    <View style={styles.item}>
        <TouchableOpacity>
            <Image style={styles.icon} source={require('../assets/tick.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.iconContainer}>
            <TouchableOpacity onPress={onEdit}>
                <Image
                    style={styles.icon}
                    source={require('../assets/edit.png')}
                    accessibilityLabel={`Edit ${id}`}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
                <Image
                    style={styles.icon}
                    source={require('../assets/delete.png')}
                    accessibilityLabel={`Delete ${id}`}
                />
            </TouchableOpacity>
        </View>
    </View>
);

const tasksReducer = (tasks, action) => {
    switch (action.type) {
        case 'added':
            return [...tasks, { id: action.id, text: action.text }];
        case 'changed':
            return tasks.map((t) =>
                t.id === action.task.id ? action.task : t
            );
        case 'deleted':
            return tasks.filter((t) => t.id !== action.id);
        default:
            throw new Error('Unknown action: ' + action.type);
    }
};

export default function Display() {
    const name = 'Trí Hiếu reducer';
    const [searchText, setSearchText] = useState('');
    const [tasks, dispatch] = useReducer(tasksReducer, [
        { id: 0, text: 'do Homework' },
        { id: 1, text: 'play football' },
        { id: 2, text: 'play badminton' }
    ]);

    const handleEdit = (id, currentText) => {
      console.log(1);
        Alert.prompt(
            `Edit Item ${id}`,
            'Enter new title:',
            (newTitle) => {
                if (newTitle && newTitle.trim() && newTitle !== currentText) {
                    dispatch({
                        type: 'changed',
                        task: { id, text: newTitle }
                    });
                }
            },
            'plain-text',
            currentText
        );
    };

    const handleDelete = (id) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this item?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'OK',
                    onPress: () => {
                        dispatch({ type: 'deleted', id });
                    }
                }
            ]
        );
    };

    const handleAddTask = () => {
        Alert.prompt(
            'Add New Task',
            'Enter task title:',
            (newTaskText) => {
                if (newTaskText && newTaskText.trim()) {
                    dispatch({
                        type: 'added',
                        id: tasks.length,
                        text: newTaskText
                    });
                }
            },
            'plain-text'
        );
    };

    const filteredTasks = tasks.filter((task) =>
        task.text.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Image source={require('../assets/goBack.png')} />
                </TouchableOpacity>

                <View style={styles.headerText}>
                    <Image source={require('../assets/avar.png')} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.headerTitle}>Hi, {name}</Text>
                        <Text style={styles.headerSubtitle}>
                            Have a great day ahead
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.searchContainer}>
                <Image source={require('../assets/search.png')} />
                <TextInput
                    style={styles.textSearch}
                    placeholder="Search"
                    onChangeText={(text) => setSearchText(text)}
                    value={searchText}
                />
            </View>

            <FlatList
                data={filteredTasks}
                renderItem={({ item }) => (
                    <Item
                        title={item.text}
                        id={item.id}
                        onEdit={() => handleEdit(item.id, item.text)}
                        onDelete={() => handleDelete(item.id)}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
            />

            <TouchableOpacity
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20
                }}
                onPress={handleAddTask}
            >
                <Image source={require('../assets/add.png')} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerText: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerSubtitle: {
        fontSize: 14,
        lineHeight: 22,
        fontWeight: '700',
        color: 'gray'
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 30,
        color: '#171A1F',
        marginLeft: 10
    },
    item: {
        borderRadius: 20,
        backgroundColor: '#DEE1E678',
        margin: 20,
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        flexDirection: 'row'
    },
    title: {
        fontSize: 18
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        height: 24,
        width: 24,
        marginLeft: 10
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#DEE1E678',
        borderRadius: 20,
        padding: 10,
        marginVertical: 10
    },
    textSearch: {
        fontSize: 16,
        marginLeft: 10
    }
});
