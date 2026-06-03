import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Welcome</Text>
      <Text style={styles.title}>Who are you?</Text>
      <Text style={styles.description}>Select your role to continue</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.roleCard}
          onPress={() => router.push('/(auth)/login' as any)}
          activeOpacity={0.7}
        >
          <View style={[styles.iconBox, { backgroundColor: '#1e2d3d' }]}>
            <Text style={styles.iconEmoji}>🏠</Text>
          </View>
          <View style={styles.roleText}>
            <Text style={styles.roleName}>Authenticate</Text>
            <Text style={styles.roleDesc}>please login today</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.roleCard}
          onPress={() => router.push('/host' as any)}
          activeOpacity={0.7}
        >
          <View style={[styles.iconBox, { backgroundColor: '#1e2d3d' }]}>
            <Text style={styles.iconEmoji}>🏠</Text>
          </View>
          <View style={styles.roleText}>
            <Text style={styles.roleName}>Host</Text>
            <Text style={styles.roleDesc}>Manage your properties</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.roleCard}
          onPress={() => router.push('/cleaner/onboarding/housekeeper_welcome')}
          activeOpacity={0.7}
        >
          <View style={[styles.iconBox, { backgroundColor: '#1d2d1d' }]}>
            <Text style={styles.iconEmoji}>🧹</Text>
          </View>
          <View style={styles.roleText}>
            <Text style={styles.roleName}>Cleaner</Text>
            <Text style={styles.roleDesc}>View your cleaning jobs</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0f0f',
    paddingHorizontal: 24,
  },
  subtitle: {
    fontSize: 12,
    letterSpacing: 2,
    color: '#666',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    gap: 14,
  },
  roleCard: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconEmoji: {
    fontSize: 22,
  },
  roleText: {
    flex: 1,
  },
  roleName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  roleDesc: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },
  arrow: {
    fontSize: 22,
    color: '#444',
  },
});