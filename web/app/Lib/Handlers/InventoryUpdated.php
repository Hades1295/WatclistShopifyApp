<?php

declare(strict_types=1);

namespace App\Lib\Handlers;

use Illuminate\Support\Facades\Log;
use Shopify\Webhooks\Handler;

class InventoryUpdated implements Handler
{
    public function handle(string $topic, string $shop, array $body): void
    {
        Log::debug(
            "Inventory updated from the shop $shop with response body: " .
                print_r($body, true)
        );
    }
}
