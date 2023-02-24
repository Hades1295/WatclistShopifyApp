<?php

declare(strict_types=1);

namespace App\Lib\Handlers;

use Illuminate\Support\Facades\Log;
use Shopify\Webhooks\Handler;
use App\Models\Watchlist;
use App\Http\Controllers\WatchListController;

class ProductUpdated implements Handler
{
    public function handle(string $topic, string $shop, array $body): void
    {   
        Log::debug(
            "Product updated from the shop $shop with response body: " .
                print_r($body['id'], true)
            );
        $productId = $body['id'];
        $productUsers = $this->getCustomer($productId,$shop);
        Log::debug($productUsers);
    }

    public function getCustomer($productId,$shop){
        $productsUsers =  Watchlist::where('shop_id', $shop)->where('product_id', $productId)->get();
        return $productsUsers;
    }
}
