<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data=DB::table('orders')
        ->join('pelanggans','pelanggans.id_pelanggan','=','orders.id_pelanggan')
        ->select('orders.*','pelanggans.*')
        ->orderBy('orders.status','asc')
        ->get();
        return response()->json($data);
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show($awal,$akhir)
    {
        // $order=Order::where('tgl_order','>=',$awal)
        // ->where('tgl_order','<=',$akhir)
        // ->orderBy('orders.status','asc')
        // ->get();

        $data=DB::table('orders')
        ->join('pelanggans','pelanggans.id_pelanggan','=','orders.id_pelanggan')
        ->select('orders.*','pelanggans.*')
        ->where('tgl_order','>=',$awal)
        ->where('tgl_order','<=',$akhir)
        ->orderBy('orders.status','asc')
        ->get();

        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request,[
            'bayar'=>'required ',
            'kembali'=>'required ',
            'status'=>'required '
        ]);
        $data=[
            'bayar'=>$request->input('bayar'),
            'kembali'=>$request->input('kembali'),
            'status'=>$request->input('status')
        ];

        $order=Order::where('id_order',$id)->update($data);
        if($order){
            return response()->json([
                    'pesan'=>'Pesanan Sudah Dibayar'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
    }
}
