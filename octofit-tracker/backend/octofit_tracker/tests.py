from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create(username='testuser', email='test@example.com', first_name='Test', last_name='User')
        self.assertEqual(user.username, 'testuser')

class TeamModelTest(TestCase):
    def test_create_team(self):
        user = User.objects.create(username='member', email='member@example.com', first_name='Member', last_name='One')
        team = Team.objects.create(name='Team1')
        team.members.add(user)
        self.assertEqual(team.name, 'Team1')
        self.assertIn(user, team.members.all())

class ActivityModelTest(TestCase):
    def test_create_activity(self):
        user = User.objects.create(username='activityuser', email='activity@example.com', first_name='Activity', last_name='User')
        activity = Activity.objects.create(user=user, activity_type='run', duration=30, calories=200, date='2024-01-01')
        self.assertEqual(activity.activity_type, 'run')

class LeaderboardModelTest(TestCase):
    def test_create_leaderboard(self):
        team = Team.objects.create(name='LeaderboardTeam')
        leaderboard = Leaderboard.objects.create(team=team, score=100, week='2024-01-01')
        self.assertEqual(leaderboard.score, 100)

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        user = User.objects.create(username='workoutuser', email='workout@example.com', first_name='Workout', last_name='User')
        workout = Workout.objects.create(user=user, name='Cardio', description='Cardio session', date='2024-01-01')
        self.assertEqual(workout.name, 'Cardio')
