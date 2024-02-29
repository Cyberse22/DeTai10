

# python manage.py sqlflush

if __name__ == '__main__':
    import os

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Thesis.settings")
    import django

    django.setup()
    from django.core.management import call_command

    from faker import Faker
    from django.contrib.auth import get_user_model
    from ThesisApp.models import Student, Lecture, Dean, CouncilMember, Council, ThesisRequest, ScoringRubric, Thesis, Score
    from django.contrib.auth.hashers import make_password
    from django.apps import apps
    from oauth2_provider.models import Application

    models = [m for c in apps.get_app_configs() for m in c.get_models(include_auto_created=False)]

    for m in models:
        m.objects.all().delete()

    fake = Faker()
    User = get_user_model()


    def create_fake_users(num_students=10, num_lecturers=5, num_deans=1):
        superuser = User.objects.create_superuser('admin', 'admin@example.com', '123')

        app = Application.objects.create(
            user=superuser,  # Liên kết ứng dụng với tài khoản người dùng
            client_id='241CnQ7mNkCafYma02PmR9b6fmFsoLR0IchRI91n',
            client_secret='HWtHDL1jxgomoK9o3WEwZgMI7CNu4rTrH0KLSanw7G3tGpY1qXpKtDol09vpf3ACyIqBq2pleqQRbN5pdCTiCnmywoQL8nKMBap3ZQARg6HP9A7xMmNY77zeujdz7hbu',
            client_type='confidential',
            authorization_grant_type='password'
        )

        # Tạo sinh viên giả mạo
        for _ in range(num_students):
            student = User.objects.create_user(
                username=fake.user_name(),
                email=fake.email(),
                password='123',
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                role='Student',

            )
            Student.objects.create(student=student)

        student = User.objects.create_user(
            username='kiet',
            email=fake.email(),
            password='123',
            first_name='kiet',
            last_name='kiet',
            role='Student',
        )
        Student.objects.create(student=student)

        # Tạo giảng viên giả mạo
        for _ in range(num_lecturers):
            lecturer = User.objects.create_user(
                username=fake.user_name(),
                email=fake.email(),
                password='123',
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                role='Lecture',
            )
            Lecture.objects.create(lecture=lecturer)

        lecturer = User.objects.create_user(
            username='giaovien',
            email=fake.email(),
            password='123',
            first_name='giaovien',
            last_name='giaovien',
            role='Lecture',
        )
        Lecture.objects.create(lecture=lecturer)


        # Tạo dean giả mạo
        for _ in range(num_deans):
            dean = User.objects.create_user(
                username=fake.user_name(),
                email=fake.email(),
                password='123',
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                role='Dean'
            )
            Dean.objects.create(dean=dean)

        dean = User.objects.create_user(
            username='giaovu',
            email=fake.email(),
            password='123',
            first_name='giaovu',
            last_name='giaovu',
            role='Dean'
        )
        Dean.objects.create(dean=dean)

    def create_fake_council_members(num_members=10):
        lecturers = Lecture.objects.all()
        councils = Council.objects.all()
        for _ in range(num_members):
            member = fake.random_element(lecturers)
            council = fake.random_element(councils)
            CouncilMember.objects.create(
                lecture=member,
                council=council,
                council_role=fake.random_element(CouncilMember.ROLES)[0]
            )


    def create_fake_councils(num_councils=5):
        for _ in range(num_councils):
            Council.objects.create(name=fake.company())


    def create_fake_thesis_requests(num_requests=10):
        students = Student.objects.all()
        for _ in range(num_requests):
            student = fake.random_element(students)
            ThesisRequest.objects.create(student=student, year=fake.year())


    def create_fake_theses(num_theses=10):
        students = Student.objects.all()
        lectures = Lecture.objects.all()
        for _ in range(num_theses):
            thesis = Thesis.objects.create(
                title=fake.sentence(nb_words=6),
                year=fake.year(),
                is_defend=fake.boolean()
            )
            thesis.students.set(fake.random_elements(students, length=fake.random_int(1, 3)))
            thesis.advisors.set(fake.random_elements(lectures, length=fake.random_int(1, 2)))


    def create_fake_scores(num_scores=10):
        theses = Thesis.objects.all()
        council_members = CouncilMember.objects.all()
        for _ in range(num_scores):
            score = Score.objects.create(
                presentation=fake.random_int(5, 10),
                content=fake.random_int(5, 10),
                attitude=fake.random_int(5, 10),
                comment=fake.paragraph(),
                thesis=fake.random_element(theses),
                council_member=fake.random_element(council_members)
            )
            score.final_score()
            score.save()


    create_fake_users()
    create_fake_councils()
    create_fake_council_members()
    create_fake_thesis_requests()
    create_fake_theses()
    create_fake_scores()

