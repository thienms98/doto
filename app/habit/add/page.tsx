import { HabitCreate } from '@/components/Habits';
import { Card, CardTitle } from '@/components/ui/card';

const HabitCreatePage = () => {
  return (
    <div className="container mx-auto p-6">
      <Card className="p-6">
        <CardTitle>Your new habit</CardTitle>
        <HabitCreate />
      </Card>
    </div>
  );
};

export default HabitCreatePage;
