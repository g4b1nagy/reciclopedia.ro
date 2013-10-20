# coding: utf-8

class HelloController < ApplicationController

  def index
    @page_name = ""
    @page_description = "Harta punctelor de reciclare la care oricine poate contribui"
    @wrapped = true
  end

  def map
    @page_name = " | harta"
    @page_description = "Găsește un punct de reciclare pe hartă"
  end

  def about
    @page_name = " | despre"
    @page_description = "Despre reciclopedia.ro"
    @wrapped = true
  end

end