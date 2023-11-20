"""empty message

Revision ID: f30071418032
Revises: db189331cab0
Create Date: 2023-11-20 00:35:12.740852

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f30071418032'
down_revision = 'db189331cab0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('self_review', schema=None) as batch_op:
        batch_op.add_column(sa.Column('deck_id', sa.Integer(), nullable=True))
        batch_op.alter_column('today_confidence',
               existing_type=sa.FLOAT(),
               type_=sa.Integer(),
               existing_nullable=False)
        batch_op.create_foreign_key(batch_op.f('fk_self_review_deck_id_deck'), 'deck', ['deck_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('self_review', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_self_review_deck_id_deck'), type_='foreignkey')
        batch_op.alter_column('today_confidence',
               existing_type=sa.Integer(),
               type_=sa.FLOAT(),
               existing_nullable=False)
        batch_op.drop_column('deck_id')

    # ### end Alembic commands ###
