<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Watchlist extends Model
{
        /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'product_watchlist';
    protected $fillable = [
        'shop_id', 'customer_id', 'product_id','customerEmail'
    ];
}
