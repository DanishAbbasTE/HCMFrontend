import { Component, Injector, OnInit } from '@angular/core';
import { BaseForm } from '../../../../sharedClasses/base-from';
import { URLz } from 'src/app/enums/url.enum';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-policy-defined-name',
  templateUrl: './policy-defined-name.component.html',
  styleUrls: ['./policy-defined-name.component.css']
})
export class PolicyDefinedNameComponent extends BaseForm implements OnInit {

  constructor( injector : Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this._fs._form = this._fb.group({
      companyId:[1],
      policyDefinedTitle:['',this._vs._val('policy Defined Title')],
      policyDefinedPrefix:['', this._vs._val('policy Defined Prefix')],
      IsActive:['',this._vs._val('Is Active')]
    })
  }

  submit(){
      console.log(this._fs._form.value);
      this._fs._form.markAllAsTouched();
      this._vs._submitted = true;
      this._vs.logForm();
      if(this._fs._form.valid){
        this._http.create({
          url: environment.API_URL,
          endpoint: URLz.SAVE_POLICY_DEFINED,
          body: this._fs._form.value
        })
        .subscribe((res)=>{
            if(res != null){
                  console.log(res);
                  this._vs._toastr_success('SuccessFully submited','success');
                  this._fs._form.reset();
            }
        })
      }

  }

}
