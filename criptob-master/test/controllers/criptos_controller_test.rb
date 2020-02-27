require 'test_helper'

class CriptosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @cripto = criptos(:one)
  end

  test "should get index" do
    get criptos_url, as: :json
    assert_response :success
  end

  test "should create cripto" do
    assert_difference('Cripto.count') do
      post criptos_url, params: { cripto: { name: @cripto.name } }, as: :json
    end

    assert_response 201
  end

  test "should show cripto" do
    get cripto_url(@cripto), as: :json
    assert_response :success
  end

  test "should update cripto" do
    patch cripto_url(@cripto), params: { cripto: { name: @cripto.name } }, as: :json
    assert_response 200
  end

  test "should destroy cripto" do
    assert_difference('Cripto.count', -1) do
      delete cripto_url(@cripto), as: :json
    end

    assert_response 204
  end
end
