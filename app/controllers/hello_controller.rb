class HelloController < ApplicationController

  def index
    @page_name = ""
    @page_description = "Harta punctelor de reciclare la care oricine poate contribui"
    @wrapped = true
  end

  def map
    @page_name = " | puncte reciclare"
    @page_description = "Harta punctelor de reciclare la care oricine poate contribui"
  end

  def about
    @page_name = " | despre"
    @page_description = "Harta punctelor de reciclare la care oricine poate contribui"
    @wrapped = true
  end

end