class Point < ActiveRecord::Base
  belongs_to :user

  validates :lat, :lng, :user_uid, presence: true
  validates :lat, :lng, numericality: true
  validates :lat, :inclusion => -90..90
  validates :lng, :inclusion => -180..180

end