import Toast from '@/components/basic/Toast';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Button } from 'react-native';

export default function index() {

  const [toastVisible, setToastVisible] = useState(false);

  const showToast = () => {
    setToastVisible(true);
  };


return(
<>
    <Link href="LoginScreen" > Go to Auth </Link>;
    <Button title="Show Toast" onPress={showToast} />
      <Toast
        message="This is a toast message"
        visible={toastVisible}
        setToast={setToastVisible}
        duration={4000}
      />
      

</>
  ) 
}