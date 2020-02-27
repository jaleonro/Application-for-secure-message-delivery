class Chanel < ApplicationRecord
    has_many :msgchanels
    validates :name, uniqueness: true
    validates :name, presence: true
end