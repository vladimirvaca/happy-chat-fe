import { Button } from 'primereact/button';

const DashboardPage = () => {

  const displayMessage = () => {
    alert('Hi I\'m a message');
  };

  return (
    <>
      Dashboard page
      <Button onClick={displayMessage}>Hi </Button>
      <i className="pi pi-times" style={{ color: 'green' }} />
    </>
  );
};

export default DashboardPage;
