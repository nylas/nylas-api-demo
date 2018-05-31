import click


from api.index import db
from api.model import User


@click.group()
def cli():
    """The Nylas Demo CLI. Helps with db utilities."""
    pass


@cli.command()
def create_tables():
    click.echo('Creating tables in {}'.format(db))
    db.create_all()


@cli.command()
@click.argument('first_name')
@click.argument('last_name')
@click.argument('email')
@click.argument('password')
@click.argument('access_token')
def add_user(first_name, last_name, email, password, access_token):
    click.echo('Adding user to {}'.format(db))
    user = User(first_name, last_name, email, password, access_token)
    db.session.add(user)
    db.session.commit()
