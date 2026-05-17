from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import date

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Borrar datos existentes
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()

        # Crear usuarios
        marvel_heroes = [
            {'username': 'ironman', 'email': 'ironman@marvel.com', 'first_name': 'Tony', 'last_name': 'Stark'},
            {'username': 'spiderman', 'email': 'spiderman@marvel.com', 'first_name': 'Peter', 'last_name': 'Parker'},
            {'username': 'captainmarvel', 'email': 'captainmarvel@marvel.com', 'first_name': 'Carol', 'last_name': 'Danvers'},
        ]
        dc_heroes = [
            {'username': 'batman', 'email': 'batman@dc.com', 'first_name': 'Bruce', 'last_name': 'Wayne'},
            {'username': 'superman', 'email': 'superman@dc.com', 'first_name': 'Clark', 'last_name': 'Kent'},
            {'username': 'wonderwoman', 'email': 'wonderwoman@dc.com', 'first_name': 'Diana', 'last_name': 'Prince'},
        ]
        marvel_users = [User.objects.create(**data) for data in marvel_heroes]
        dc_users = [User.objects.create(**data) for data in dc_heroes]

        # Crear equipos
        marvel_team = Team.objects.create(name='Marvel')
        marvel_team.members.set(marvel_users)
        dc_team = Team.objects.create(name='DC')
        dc_team.members.set(dc_users)

        # Crear actividades
        Activity.objects.create(user=marvel_users[0], activity_type='run', duration=30, calories=300, date=date(2024, 1, 1))
        Activity.objects.create(user=dc_users[0], activity_type='bike', duration=45, calories=400, date=date(2024, 1, 2))

        # Crear leaderboard
        Leaderboard.objects.create(team=marvel_team, score=100, week=date(2024, 1, 7))
        Leaderboard.objects.create(team=dc_team, score=90, week=date(2024, 1, 7))

        # Crear workouts
        Workout.objects.create(user=marvel_users[1], name='Cardio', description='Cardio session', date=date(2024, 1, 3))
        Workout.objects.create(user=dc_users[1], name='Strength', description='Strength session', date=date(2024, 1, 4))

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data'))
