<?php

use App\Http\Controllers\WatchListController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/', function () {
    return "Hello API";
});
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('addToWatchlist',[WatchListController::class,'store']);
Route::post('removeWatchlist', [WatchListController::class,'destroy']);
Route::post('checkWatchlist', [WatchListController::class,'check']);
Route::post('checkWatchGridlist', [WatchListController::class,'checkList']);
