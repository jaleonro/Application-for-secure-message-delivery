class Cripto < ApplicationRecord
    has_many :messages
    validates :name, uniqueness: true
end
