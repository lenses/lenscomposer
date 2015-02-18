class LensesController < ApplicationController

  def new_test
  end

  def new
  end

  def index
    @lenses = Lens.all.to_a
  end

  def create
    lens_params = [:author, :name, :type, :connector_data, :linear_data, :final_result]
    attrb = select_params(lens_params)

    # Deserialize array of objects before saving
    attrb["linear_data"] = attrb["linear_data"] ? JSON.parse(attrb["linear_data"]) : nil
    attrb["connector_data"] = attrb["connector_data"] ? JSON.parse(attrb["connector_data"]) : nil
    attrb["final_result"] = attrb["final_result"] ? JSON.parse(attrb["final_result"]) : nil
    
    lens = Lens.create(attrb)
    if lens
      flash[:notice] = 'Your lens has been saved!'
      # flash.keep(:notice)
    end
    render json: lens.id.to_s.to_json
    
  end

  def show
    @lens = Lens.find(params[:id])
    gon.final_result = @lens.final_result
    if !@lens.final_result
      render inline: "No final result for this lens"
    end
  end

  def edit
    @lens = Lens.find(params[:id])
    
    if @lens.type == 'linear'
      gon.lens = { 'linear_data'=> @lens.linear_data, 'author'=> @lens.author, 'title'=> @lens.name, 'type'=> @lens.type}
    elsif @lens.type == 'connector'
      gon.lens = { 'connector_data'=> @lens.connector_data, 'type'=> @lens.type}
    end
    
  end

  # Not currently being used -- instead of updating a lens, a new lens a created
  def update
    @lens = Lens.find(params[:id])
    attrb = select_params(lens_params)
    # linear_data is an array of Objects of Components Properties
    # that needs to be deserialized correctly
    attrb["linear_data"] = JSON.parse(attrb["linear_data"])
    lens = Lens.update(attrb)
    
    # @lens.update(lens_params)
    # render inline: "<%= @lens.id %>"
  end

  def destroy
    lens = Lens.find(params[:id])
    lens.remove()
     respond_to do |format|
      format.js
      format.html { redirect_to lenses_url }
      format.json { head :no_content }
    end
  end

  private

  def select_params(sel_params)
    params.select { |v| sel_params.include?(v.to_sym)}
  end

end
