import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-expo';

const Profile = () => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    // Set the initial values once the user is loaded
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
    }
  }, [user]); // Run the effect whenever the user object changes

  const onSaveUser = async () => {
    if (!user) return; // Ensure user is defined before attempting update

    try {
      // Update the user details
      const result = await user.update({
        firstName: firstName,
        lastName: lastName,
      });
      console.log('User updated successfully:', result);
    } catch (e) {
      console.error('Error updating user:', JSON.stringify(e));
    }
  };

  // Show a loading state if the user is not yet loaded
  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center' }}>
        Good morning {user.firstName} {user.lastName}!
      </Text>

      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.inputField}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.inputField}
      />
      <Button onPress={onSaveUser} title="Update account" color={'#6c47ff'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
});

export default Profile;
