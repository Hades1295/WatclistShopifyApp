<?php

namespace App\Http\Controllers;

use App\Models\Watchlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Shopify\Rest\Admin2022_07\Image;
use Shopify\Utils;

class WatchListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $shop = Auth::user();

        $shopWishlists = Watchlist::where('shop_id', $shop->name)->orderBy('updated_at', 'desc')->get();

        $lists = [];

        foreach($shopWishlists as $item){
            array_push($lists, "gid://shopify/Product/{$item->product_id}");
        }

        $mylist = json_encode($lists);

        $query = "
            {
                nodes(ids:  $mylist ) {
                ... on Product {
                    id
                    title
                    handle
                    featuredImage {
                      originalSrc
                    }
                    totalInventory
                    vendor
                    onlineStorePreviewUrl
                    priceRange{
                    maxVariantPrice{
                        currencyCode
                        amount
                        }
                    }
                    }
                }
            }

        ";

        $products = $shop->api()->graph($query);

        return view('partials.wishlist-table', compact('products'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Check the specified resource from storage.
     *
     * @param  \App\Watchlist  $wishlist
     * @return \Illuminate\Http\Response
     */
    public function check(Request $request)
    {
        //
           logger($request); 
        $item = Watchlist::where('shop_id', $request['shop_id'])->where('customer_id', $request['customer_id'])->where('product_id', $request['product_id'])->first();

        if($item){
            return 1;
        }else{
            return 0;
        }
    }
        /**
     * Check the specified resource from storage.
     *
     * @param  \App\Watchlist  $wishlist
     * @return \Illuminate\Http\Response
     */
    public function checkList(Request $request)
    {
        $requestArray = $request->all()['watchlist'];
        $itemCheckArray = [];
        foreach ($requestArray as $key => $value) {
           logger($value);
         $item = Watchlist::where('shop_id', $value['shop_id'])->where('customer_id', $value['customer_id'])->where('product_id', $value['product_id'])->first();
        if($item){
            $itemCheckArray[$key]['product_id'] = $value['product_id'];  
            $itemCheckArray[$key]['status'] = 1;      
        }else{
            $itemCheckArray[$key]['product_id'] = $value['product_id'];     
            $itemCheckArray[$key]['status'] = 0;    
        } 
        } 
        return $itemCheckArray;

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {  
        Watchlist::updateOrCreate($request->all());

        return "Success";
        // logger("123");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Watchlist  $watchlist
     * @return \Illuminate\Http\Response
     */
    public function show(Watchlist $watchlist)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Watchlist  $watchlist
     * @return \Illuminate\Http\Response
     */
    public function edit(Watchlist $watchlist)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Watchlist  $watchlist
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Watchlist $watchlist)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Watchlist  $watchlist
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $item = Watchlist::where('shop_id', $request['shop_id'])->where('customer_id', $request['customer_id'])->where('product_id', $request['product_id'])->first();

        return Watchlist::destroy($item->id);
    }
}
