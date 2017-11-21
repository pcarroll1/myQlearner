///////////////////////////
//
// Library for Q Server
//
///////////////////////////

// libs

// args
funcRef:([func:()];logic:();params:();out:());
`funcRef upsert (`add;"{x+y}";(3;4);7);
`funcRef upsert (`del;"{x-y}";(7;2);5);
`funcRef upsert (`mult;"{x*y}";(9;9);81);

// Function Integrated into Tbl
//(value (funcRef[`add][`logic])) . funcRef[`add][`params]


// functions
/Input Separating Function
funcSep:{[x];funcs:()!();funcs[(`$(x?":")#x)]:(((x?":")+1)_x);funcs};
/Feed Handling Function
//.z.ws:{neg[.z.w].Q.s select input,expected,actual from (select input,first expected by actual from ([]input:(3;4);expected:7;actual:(value(a[first key a:funcSep(raze string[x])])) . (3;4)))}
.z.ws:{neg[.z.w].Q.s
        $[(first key funcSep(raze string[x])) in key funcRef;
                `input`Actual`Expected xcols () xkey (select input,Expected:(first Expected) by Actual from ([]input:(funcRef[first key funcSep(raze string[x])][`params]);Expected:(funcRef[first key funcSep(raze string[x])][`out]);Actual:(first ((value(a[first key a:funcSep(raze string[x])])) . funcRef[first key funcSep(raze string[x])][`params]))));
        value x]
        }
