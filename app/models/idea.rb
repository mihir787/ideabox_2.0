class Idea < ActiveRecord::Base
  enum quality: %w(swill plausible genius)

  def truncate
    if body.length > 100
      body[0..99] + body[100..body.length - 1].split(" ").first
    else
      body
    end
  end

  def up
    if quality.to_i < 3
      self.quality = quality.to_i + 1
    end
  end

  def down
    if quality.to_i > 0
      self.quality = quality.to_i - 1
    end
  end

end
