# coding: utf-8

class PointsController < ApplicationController
  # GET /points
  # GET /points.json
  def index
    @points = Point.all

    respond_to do |format|
      format.json { render json: @points, :except => [:address, :created_at, :updated_at] }
    end
  end

  # GET /points/1
  # GET /points/1.json
  def show
    @page_name = " | locația " + params[:id]
    @page_description = "Harta punctelor de reciclare la care oricine poate contribui"

    @point = Point.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @point, :except => [:address, :created_at, :updated_at] }
    end
  end

  # GET /points/new
  # GET /points/new.json
  def new
    @page_name = " | adaugă locație"
    @page_description = "Adaugă un punct nou de reciclare pe hartă"
    @wrapped = true

    @point = Point.new

    respond_to do |format|
      format.html # new.html.erb
    end
  end

  # POST /points
  # POST /points.json
  def create
    @point = Point.new(params[:point])
    @point.user_uid = current_user.uid

    respond_to do |format|
      if @point.save
        format.html { redirect_to @point, notice: 'Point was successfully created.' }
      else
        format.html { redirect_to :add }
      end
    end
  end

end